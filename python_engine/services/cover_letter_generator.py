import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def generate_cover_letter(skills, job_description, user_name):
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        
        prompt = f"""
        You are an expert cover letter writer.
        Candidate Name: {user_name}
        Candidate Skills: {", ".join(skills)}
        Job Description: {job_description}
        
        Write a highly professional, concise, and persuasive cover letter for this job application.
        The tone should be confident and polite.
        
        Return STRICTLY as a valid JSON object with a single key: "cover_letter".
        The value of "cover_letter" MUST be a single string containing the entire letter with line breaks (\\n).
        Do NOT return an object inside "cover_letter". It must be a plain string.
        Example format: {{"cover_letter": "Dear Hiring Manager,\\n\\nI am writing to..."}}
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="openai/gpt-oss-120b",  # <-- Yahan update karein
            response_format={"type": "json_object"}
        )
        
        response_text = chat_completion.choices[0].message.content
        parsed = json.loads(response_text)
        
        cl = parsed.get("cover_letter", "")
        # Agar AI phir bhi object return kare toh usko string mein convert kar dena
        if isinstance(cl, dict):
            cl = json.dumps(cl)
            
        return cl

    except Exception as e:
        print(f"Error generating cover letter: {e}")
        return ""