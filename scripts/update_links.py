#!/usr/bin/env python3
"""
Script to update links.json from various RSS feeds.
Supports Note, Twitter/X, and Google Scholar.
"""

import json
import os
import datetime
import feedparser
import requests
from typing import List, Dict, Any

# Configuration
RSS_FEEDS = {
    "note": [
        "https://note.com/example/rss",  # Replace with actual Note RSS feed URLs
    ],
    "twitter": [
        "https://nitter.net/example/rss",  # Replace with actual Nitter RSS feed URLs (for Twitter/X)
    ],
    # Google Scholar doesn't have a direct RSS feed, but we can simulate one with a custom function
}

# Path to the links.json file
LINKS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "links.json")

def load_existing_links() -> List[Dict[str, Any]]:
    """Load existing links from the JSON file."""
    try:
        with open(LINKS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_links(links: List[Dict[str, Any]]) -> None:
    """Save links to the JSON file."""
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        json.dump(links, f, ensure_ascii=False, indent=2)

def extract_tags_from_content(content: str) -> List[str]:
    """Extract potential tags from content using simple heuristics."""
    # This is a very basic implementation - you might want to use NLP for better results
    words = content.lower().split()
    potential_tags = []
    
    # Common tech-related terms that might be good tags
    tech_terms = ["ai", "機械学習", "ディープラーニング", "プログラミング", "技術", "エッセイ"]
    
    for term in tech_terms:
        if term.lower() in content.lower():
            potential_tags.append(term)
    
    return list(set(potential_tags))  # Remove duplicates

def process_note_feeds() -> List[Dict[str, Any]]:
    """Process Note RSS feeds."""
    new_links = []
    
    for feed_url in RSS_FEEDS.get("note", []):
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries:
                # Create a link object
                link = {
                    "title": entry.title,
                    "url": entry.link,
                    "source": "note",
                    "date": datetime.datetime.now().strftime("%Y-%m-%d"),  # Use current date if published date is not available
                    "tags": extract_tags_from_content(entry.get("summary", ""))
                }
                
                # Try to get the published date
                if hasattr(entry, "published_parsed") and entry.published_parsed:
                    published_date = datetime.datetime(*entry.published_parsed[:6])
                    link["date"] = published_date.strftime("%Y-%m-%d")
                
                new_links.append(link)
        except Exception as e:
            print(f"Error processing Note feed {feed_url}: {e}")
    
    return new_links

def process_twitter_feeds() -> List[Dict[str, Any]]:
    """Process Twitter/X RSS feeds via Nitter."""
    new_links = []
    
    for feed_url in RSS_FEEDS.get("twitter", []):
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries:
                # Create a link object
                link = {
                    "title": entry.title,
                    "url": entry.link,
                    "source": "twitter",
                    "date": datetime.datetime.now().strftime("%Y-%m-%d"),  # Use current date if published date is not available
                    "tags": extract_tags_from_content(entry.get("summary", ""))
                }
                
                # Try to get the published date
                if hasattr(entry, "published_parsed") and entry.published_parsed:
                    published_date = datetime.datetime(*entry.published_parsed[:6])
                    link["date"] = published_date.strftime("%Y-%m-%d")
                
                new_links.append(link)
        except Exception as e:
            print(f"Error processing Twitter feed {feed_url}: {e}")
    
    return new_links

def main():
    """Main function to update links.json."""
    # Load existing links
    existing_links = load_existing_links()
    
    # Create a set of existing URLs to avoid duplicates
    existing_urls = {link["url"] for link in existing_links}
    
    # Process feeds
    new_links = []
    new_links.extend(process_note_feeds())
    new_links.extend(process_twitter_feeds())
    
    # Add only new links (avoid duplicates)
    for link in new_links:
        if link["url"] not in existing_urls:
            existing_links.append(link)
            existing_urls.add(link["url"])
    
    # Sort links by date (newest first)
    existing_links.sort(key=lambda x: x["date"], reverse=True)
    
    # Save updated links
    save_links(existing_links)
    print(f"Updated links.json with {len(new_links)} new links.")

if __name__ == "__main__":
    main()
