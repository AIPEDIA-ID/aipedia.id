import json

order = [
    "mita", "wita", "gita", "wilo",
    "fina", "wanda", "tira",
    "sona", "loka", "dany",
    "beny", "selo", "hima", "cisa",
    "viko", "lila", "prima"
]

with open('_docs/database/assistants.json', 'r') as f:
    data = json.load(f)

# Sort the characters array based on the index in the 'order' list
data['characters'].sort(key=lambda x: order.index(x['id']) if x['id'] in order else 999)

with open('_docs/database/assistants.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Reordered assistants.json")

# Also update seeInAction.json
with open('src/data/seeInAction.json', 'r') as f:
    see = json.load(f)

mapping = {
    "Business Strategy": "Beny",
    "Marketing & Social": "Sona",
    "Data Analysis": "Dany",
    "SEO Optimization": "Selo",
    "Finance Specialist": "Fina",
    "Copywriting & Ads": "Wita",
    "HR & Rekrutmen": "Prima"
}

for item in see['galleryImages']:
    if item['capability'] in mapping:
        item['capability'] = mapping[item['capability']]

with open('src/data/seeInAction.json', 'w') as f:
    json.dump(see, f, indent=2)

print("Updated seeInAction.json")
