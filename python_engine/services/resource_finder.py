import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def find_study_resources(skills, job_description):
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        
        prompt = f"""
        You are an expert career mentor.
        Candidate's current skills: {", ".join(skills)}
        Target Job Description: {job_description}
        
        Identify the top 2 missing skills that the candidate needs to learn to be a strong fit for this job.
        For each missing skill, provide a specific learning resource (like a YouTube search link or official documentation link).
        
        Return STRICTLY as a valid JSON object with a key "resources", which contains an array of objects.
        Each object must have: skill_name, reason, resource_url.
        Do not return any markdown, just pure JSON.
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="openai/gpt-oss-120b",  # <-- Yahan update karein
            response_format={"type": "json_object"}
        )
        
        response_text = chat_completion.choices[0].message.content
        parsed = json.loads(response_text)
        return parsed.get("resources", [])

    except Exception as e:
        print(f"Error finding resources: {e}")
        return []