import json
import pandas as pd
from urllib.request import urlopen

api_url = 'http://127.0.0.1:8000/api/warehouses/warehouse-list'


def get(url, object_hook=None):
    with urlopen(url) as resource:  # 'with' is important to close the resource after use
        return json.load(resource, object_hook=object_hook)

data = get(api_url)
columns = ['name', 'logistics.parking']
df = pd.DataFrame(pd.json_normalize(data["results"]), columns=columns)

print(df)
