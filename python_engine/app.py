from flask import Flask, request, jsonify
from flask_cors import CORS
from services.resume_parser import extract_resume_data
from services.job_scraper import scrape_all_platforms
from services.job_matcher import match_job_with_resume, match_multiple_jobs
from services.resource_finder import find_study_resources
from services.cover_letter_generator import generate_cover_letter
import os

app = Flask(__name__)
CORS(app)

# 1. Resume Parser Route
@app.route('/py/parse-resume', methods=['POST'])
def parse_resume_route():
    try:
        data = request.json
        pdf_path = data.get('pdf_path')
        
        if not pdf_path or not os.path.exists(pdf_path):
            return jsonify({"error": "PDF file not found"}), 400

        extracted_data = extract_resume_data(pdf_path)
        
        if extracted_data:
            return jsonify({"status": "success", "data": extracted_data}), 200
        else:
            return jsonify({"error": "Failed to extract data"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Multi-Platform Job Scraper Route
@app.route('/py/scrape-jobs', methods=['POST'])
def scrape_jobs_route():
    try:
        data = request.json
        skills = data.get('skills', [])
        platforms = data.get('platforms', ["RemoteOK"])
        
        jobs = scrape_all_platforms(skills, platforms)
        return jsonify({"status": "success", "jobs": jobs}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 3. Single Job Matching Route
@app.route('/py/match-job', methods=['POST'])
def match_job_route():
    try:
        data = request.json
        skills = data.get('skills', [])
        job_description = data.get('job_description', '')
        
        if not skills or not job_description:
            return jsonify({"error": "Skills and Job description are required"}), 400

        match_data = match_job_with_resume(skills, job_description)
        
        if match_data:
            return jsonify({"status": "success", "data": match_data}), 200
        else:
            return jsonify({"error": "Failed to generate match score"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 4. Multiple Jobs Matching Route
@app.route('/py/match-multiple-jobs', methods=['POST'])
def match_multiple_jobs_route():
    try:
        data = request.json
        skills = data.get('skills', [])
        jobs = data.get('jobs', [])
        
        if not skills or not jobs:
            return jsonify({"error": "Skills and Jobs are required"}), 400

        results = match_multiple_jobs(skills, jobs)
        return jsonify({"status": "success", "results": results}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 5. Study Resources Route
@app.route('/py/suggest-resources', methods=['POST'])
def suggest_resources_route():
    try:
        data = request.json
        skills = data.get('skills', [])
        job_description = data.get('job_description', '')
        
        if not skills or not job_description:
            return jsonify({"error": "Skills and Job description are required"}), 400

        resources = find_study_resources(skills, job_description)
        return jsonify({"status": "success", "resources": resources}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 6. Cover Letter Generator Route
@app.route('/py/generate-cover-letter', methods=['POST'])
def generate_cover_letter_route():
    try:
        data = request.json
        skills = data.get('skills', [])
        job_description = data.get('job_description', '')
        user_name = data.get('user_name', 'Candidate')
        
        if not skills or not job_description:
            return jsonify({"error": "Skills and Job description are required"}), 400

        cover_letter = generate_cover_letter(skills, job_description, user_name)
        
        if cover_letter:
            return jsonify({"status": "success", "cover_letter": cover_letter}), 200
        else:
            return jsonify({"error": "Failed to generate cover letter"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)