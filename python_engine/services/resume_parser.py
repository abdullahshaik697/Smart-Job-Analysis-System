import os
import pdfplumber
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def extract_resume_data(pdf_path):
    # 1. PDF se text extract karna
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

    if not text:
        return None

    # 2. Groq API ko text bhejna
    try:
        # Groq client initialize karna
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        
        prompt = f"""
        You are an expert resume parser. Extract the following information from this resume text:
        1. Name
        2. Email
        3. Phone
        4. Skills (as a list of strings)
        5. Experience (list of job roles/companies)
        6. Education (list of degrees/institutions)
        
        Return the result STRICTLY as a valid JSON object with these keys: name, email, phone, skills, experience, education.
        Do not return any markdown or extra text, just pure JSON.
        
        Resume Text:
        {text}
        """
        

        # Groq se response lena (Llama 3 model use kar rahe hain jo fast aur free hai)
        chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="openai/gpt-oss-120b",  # <-- Yahan update karein
        response_format={"type": "json_object"}
)
        
        # Response se JSON nikalna
        response_text = chat_completion.choices[0].message.content
        return json.loads(response_text)

    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return None