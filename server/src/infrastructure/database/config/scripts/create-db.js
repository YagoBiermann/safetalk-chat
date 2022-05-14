const safetalk = db.getSiblingDB('safetalk_db')
safetalk.createCollection('users')
safetalk.createCollection('rooms')