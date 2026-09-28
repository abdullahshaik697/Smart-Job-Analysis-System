import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def match_job_with_resume(skills, job_description):
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        
        prompt = f"""
        You are an expert HR recruiter and AI matching system.
        Compare the candidate's skills with the job description.
        
        Candidate Skills: {", ".join(skills)}
        
        Job Description: {job_description}
        
        Provide a match score from 0 to 100 (where 100 is a perfect match).
        Also provide a brief reasoning (2-3 sentences) explaining why this is a good or bad match.
        
        Return the result STRICTLY as a valid JSON object with these keys: score, reasoning.
        Do not return any markdown or extra text, just pure JSON.
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",  # <-- Latest Groq Model
            response_format={"type": "json_object"}
        )
        
        response_text = chat_completion.choices[0].message.content
        return json.loads(response_text)

    except Exception as e:
        print(f"Error calling Groq API for matching: {e}")
        return None

def match_multiple_jobs(skills, jobs):
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        
        prompt = f"""
        You are an expert HR AI. Candidate skills: {", ".join(skills)}
        
        Here is a list of jobs: {json.dumps(jobs)}
        
        For EACH job, provide a match score from 0 to 100 and a brief 1-sentence reasoning.
        Return STRICTLY as a valid JSON object with a key "results", which contains an array of objects.
        Each object must have: jobUrl, score, reasoning.
        Do not return any markdown, just pure JSON.
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",  # <-- Latest Groq Model
            response_format={"type": "json_object"}
        )
        
        response_text = chat_completion.choices[0].message.content
        parsed = json.loads(response_text)
        return parsed.get("results", [])

    except Exception as e:
        print(f"Error in batch matching: {e}")
        return []