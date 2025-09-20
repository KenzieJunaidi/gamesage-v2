from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import pickle
import json
from scipy.sparse import load_npz
import locale

app = Flask(__name__)
CORS(app)

# Load game data
with open('../public/steam_games.json', 'r') as file:
    data = json.load(file)

df = pd.DataFrame.from_dict(data, orient='index')

# Data Cleaning
index_to_drop = df[df['name'] == 'Fog of War'].index[0]
df = df.drop(index_to_drop)

# Load feature matrix and model
combined_features = load_npz('backend/combined_features.npz')
with open('backend/knn_game_model_tuned.pkl', 'rb') as f:
    model = pickle.load(f)

# Create index mapping
data_df = df.copy()

# Recommendation function
def recommend_games_knn(game_title, top_n=40):
    game_title = game_title.lower()
    if df['name'].str.lower().eq(game_title).any():
        idx = df[df['name'].str.lower() == game_title].index[0]
        row_number = data_df.index.get_loc(idx)

    else:
        return []

    print(df.loc[idx]['name'], data_df.index.get_loc(idx)) #TEMP

    combined_features_csr = combined_features.tocsr()
    distances, indices = model.kneighbors(combined_features_csr[row_number], n_neighbors=top_n + 1)
    recommended_indices = indices[0][1:]

    recommendations = df.iloc[recommended_indices].to_dict(orient="records")

    return recommendations

# API route
@app.route('/', methods=['GET'])
def recommend():
    title = request.args.get('searchInput')
    if not title:
        return jsonify({'error': 'Please provide a game title'}), 400

    results = recommend_games_knn(title)
    if not results:
        return jsonify({'error': f"Game '{title}' not found."}), 404

    return jsonify(results)

# @app.route('/game-info', methods=['GET'])
# def game_info():
#     title = request.args.get('name')

#     # Find the game in the dataset
#     game = df[df['name'].str.lower() == title.lower()]

#     # Format Price
#     price_value = int(game['price'].values[0]) if game['price'].values[0] != 0.0 else 0
#     formatted_price = 'Free' if price_value == 0 else f"Rp {f'{price_value:,}'.replace(',', '.')}"

#     # Format Reviews
#     review_text = game['review_score_text'].values[0] if 'review_score_text' in game.columns else 'No Reviews'
#     review_count = f"{game['review_count'].values[0]:,}"
#     formatted_review = review_text + f' ({review_count})'

#     # Extract relevant fields
#     game_data = {
#         'name': game['name'].values[0],
#         'price': formatted_price,
#         'description': game['short_description'].values[0] if 'short_description' in game.columns else 'No description available.',
#         'image': game['header_image'].values[0] if 'header_image' in game.columns else '/assets/default_image.jpg',
#         'review': formatted_review,
#         'date': game['release_date'].values[0] if 'release_date' in game.columns else 'Unknown',
#         'developer': ', '.join(game['developers'].values[0]) if 'developers' in game.columns and isinstance(game['developers'].values[0], list) else 'Unknown',
#         'publisher': ', '.join(game['publishers'].values[0]) if 'publishers' in game.columns and isinstance(game['publishers'].values[0], list) else 'Unknown',
#         'genres': ', '.join(game['genres'].values[0]) if 'genres' in game.columns and isinstance(game['genres'].values[0], list) else 'Unknown',
#         'screenshots': game['screenshots'].values[0] if 'screenshots' in game.columns else [],
#         'movies': game['movies'].values[0] if 'movies' in game.columns else []
#     }

#     return jsonify(game_data)

if __name__ == '__main__':
    app.run(debug=True)