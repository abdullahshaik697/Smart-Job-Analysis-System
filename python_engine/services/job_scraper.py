import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET

# 1. RemoteOK se jobs lana
def scrape_remoteok(skills):
    search_query = ",".join(skills[:3]).lower() if skills else "developer"
    url = f"https://remoteok.com/api?tags={search_query}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    
    jobs = []
    try:
        response = requests.get(url, headers=headers, timeout=10)
        data = response.json()
        for item in data[1:10]:
            if item.get("url"):
                title = item.get("position", "Unknown")
                desc = BeautifulSoup(item.get("description", ""), "html.parser").get_text(separator=" ", strip=True)
                
                jobs.append({
                    "title": title,
                    "company": item.get("company", "Unknown"),
                    "description": desc[:200] + "...",
                    "location": item.get("location") or "Remote",
                    "jobUrl": item.get("url"),
                    "source": "RemoteOK"
                })
    except Exception as e:
        print(f"RemoteOK Error: {e}")
    return jobs

# 2. Remotive se jobs lana (100% Reliable JSON API)
def scrape_remotive(skills):
    search_query = " ".join(skills[:3]).lower() if skills else "developer"
    url = f"https://remotive.com/api/remote-jobs?search={search_query}&limit=10"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    
    jobs = []
    try:
        response = requests.get(url, headers=headers, timeout=10)
        data = response.json()
        
        for item in data.get('jobs', [])[:10]:
            title = item.get('title', 'Unknown')
            desc = BeautifulSoup(item.get("description", ""), "html.parser").get_text(separator=" ", strip=True)
            
            jobs.append({
                "title": title,
                "company": item.get("company_name", "Unknown"),
                "description": desc[:200] + "...",
                "location": item.get("candidate_required_location") or "Remote",
                "jobUrl": item.get("url"),
                "source": "Remotive"
            })
    except Exception as e:
        print(f"Remotive Error: {e}")
    return jobs

# 3. WeWorkRemotely se jobs lana (RSS Feed - 100% Reliable)
def scrape_weworkremotely(skills):
    url = "https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss"
    headers = {"User-Agent": "Mozilla/5.0"}
    jobs = []
    try:
        response = requests.get(url, headers=headers, timeout=10)
        root = ET.fromstring(response.content)
        
        for item in root.findall('.//item')[:10]:
            title = item.find('title').text
            link = item.find('link').text
            desc_html = item.find('description').text
            clean_desc = BeautifulSoup(desc_html, "html.parser").get_text(separator=" ", strip=True)
            
            # Title usually format: "Company: Job Title"
            company = title.split(':')[0].strip() if ':' in title else "Unknown"
            job_title = title.split(':')[-1].strip() if ':' in title else title
            
            jobs.append({
                "title": job_title,
                "company": company,
                "description": clean_desc[:200] + "...",
                "location": "Remote",
                "jobUrl": link,
                "source": "WeWorkRemotely"
            })
    except Exception as e:
        print(f"WeWorkRemotely Error: {e}")
    return jobs

# Main Function
# Main Function
def scrape_all_platforms(skills, platforms):
    all_jobs = []
    if "RemoteOK" in platforms:
        all_jobs.extend(scrape_remoteok(skills))
    if "WeWorkRemotely" in platforms:
        all_jobs.extend(scrape_weworkremotely(skills))
    if "Remotive" in platforms:
        all_jobs.extend(scrape_remotive(skills)) # Yeh add karein
        
    return all_jobs[:20]