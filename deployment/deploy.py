import json
import sys
import requests

SYMBOLS_IN_CHUNK = 1024

def put_chunk(host, id_, data, append=True):
    url = f"http://{host}/rpc/Script.PutCode"
    req = {"id": id_, "code": data, "append": append}
    req_data = json.dumps(req, ensure_ascii=False)
    res = requests.post(url, data=req_data.encode("utf-8"), timeout=2)
    print(res.json())


def put(file, id_, host):
    print(f"Uploading file: '{file}' as script id {id_} to host '{host}'...")
    with open(
        file,
        mode="r",
        encoding="utf-8",
    ) as f:
        code = f.read()

    pos = 0
    append = False
    print(f"total {len(code)} bytes")
    while pos < len(code):
        chunk = code[pos : pos + SYMBOLS_IN_CHUNK]
        put_chunk(host, id_, chunk, append)
        pos += len(chunk)
        append = True

def start(host, id):
    print(f"Starting script {id} ...")
    headers = {'Content-type': 'application/octet-stream'}
    params = json.dumps({"id": id})
    url = f"http://{host}/rpc/Script.Start"
    response = requests.post(url, headers=headers, data=params)

def stop(host, id):
    print(f"Stopping script {id} ...")
    headers = {'Content-type': 'application/octet-stream'}
    params = json.dumps({"id": id})
    url = f"http://{host}/rpc/Script.Stop"
    response = requests.post(url, headers=headers, data=params)

def main():

    json_file_path = '/workspaces/shelly-scripts/deployment/devices.json'

    # Load the JSON data from the file
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    # Loop over each entry in the JSON data
    for entry in data:
        host = entry["host"]
        id = entry["id"]
        stop(host, id)
        put(
            f"/workspaces/shelly-scripts/dist/{entry["file"]}",
            id,
            host)
        start(host, id)

if __name__ == "__main__":
    main()