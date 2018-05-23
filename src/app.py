#!/usr/bin/env python3
from flask import Flask, request, jsonify
import json
app = Flask(__name__)

@app.route('/get_file/', methods=["POST"], strict_slashes=False)
def get_file():
    data = json.loads(request.data)
    lines = []
    with open(data, "r", encoding="utf8") as f:
        for line in f:
            lines.append(line)
    headers = lines.pop(0).strip().split(',')
    lst = []
    for line in lines:
        spl = line.split(',')
        dct = {}
        for i, elem in enumerate(spl):
            if elem != "\n":
                dct[headers[i]] = elem
        lst.append(dct)

    return jsonify(lst)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
