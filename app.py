from flask import Flask, render_template, jsonify, request
import os
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():
    # Student portfolio data - perfectly matched sections
    portfolio_data = {
        "name": "Vaishavi P Rao",
        "title": "Aspiring Model • Creative Writer • Fitness Enthusiast",
        "bio": "Passionate student exploring the creative world of modeling, writing, and fitness. Always eager to learn, grow, and take on new challenges in these exciting fields.",
        
        "services": [
            {
                "icon": "fas fa-camera",
                "title": "Student Modeling",
                "description": "Building my portfolio through photoshoots, learning poses, and developing confidence in front of the camera.",
                "skills": ["Portrait Photography", "Fashion Basics", "Posing Practice", "Social Media Content"]
            },
            {
                "icon": "fas fa-pen-nib",
                "title": "Creative Writing",
                "description": "Passionate about storytelling, blogging, and creating engaging content for social media and personal projects.",
                "skills": ["Poem Writing", "Creative Stories"]
            },
            {
                "icon": "fas fa-heart",
                "title": "Fitness Journey",
                "description": "Sharing my fitness journey, healthy lifestyle tips, and motivating others to stay active and healthy.",
                "skills": ["Workout Planning", "Healthy Recipes", "Fitness Tips"]
            }
        ],
        
        "portfolio_items": [
            {
                "id": 1,
                "src": "images/gallery1.jpg",
                "title": "First Portrait Session",
                "category": "modeling",
                "client": "Personal Project",
                "year": "2024",
                "description": "My very first portrait photoshoot - learning about lighting and poses!"
            },
            {
                "id": 2,
                "src": "images/gallery2.jpg",
                "title": "Fitness Progress Photos",
                "category": "fitness",
                "client": "Instagram Post",
                "year": "2024",
                "description": "Documenting my fitness journey and sharing progress with followers."
            },
            {
                "id": 3,
                "src": "images/gallery3.jpg",
                "title": "Personal Blog",
                "category": "writing",
                "client": "Personal Blog",
                "year": "2024",
                "description": "whispers of My Pen"
            },
            {
                "id": 4,
                "src": "images/gallery4.jpg",
                "title": "Fashion Practice Shoot",
                "category": "modeling",
                "client": "Photography Class",
                "year": "2024",
                "description": "Practicing different fashion poses and expressions."
            },
            {
                "id": 5,
                "src": "images/gallery5.jpg",
                "title": "Collaboration Shoots",
                "category": "modeling",
                "client": "30-Day Challenge",
                "year": "2024",
                "description": "In Love with every click."
            },
            {
                "id": 6,
                "src": "images/gallery6.jpg",
                "title": "My Words",
                "category": "writing",
                "client": "College Workshop",
                "year": "2024",
                "description": "Lost in Pages Found in words."
            }
        ],
        
        "achievements": [
            {"number": "3+", "label": "Practice Sessions"},
            {"number": "10+", "label": "Photo Shoots"},
            {"number": "1", "label": "Year Learning"},
            {"number": "100%", "label": "Passion & Dedication"}
        ]
    }
    
    return render_template("index.html", data=portfolio_data)

@app.route("/contact", methods=['POST'])
def contact():
    if request.method == 'POST':
        data = request.get_json()
        return jsonify({"status": "success", "message": "Thank you for reaching out! I'll get back to you soon. 😊"})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
