### Web Scraping

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from urrlib.request import urlopen
from bs4 import BeautifulSoup

url = 'https://example.com'
html = urlopen(url)
soup = BeautifulSoup(html, 'lxml')    # lxml is html parser

# Extracting data
print(soup.title)   # title of html link
print(soup.text)    # text of webpage

all_links = soup.find_all('a')   # method used to extract html tags such as <a>, <table> etc
for x in all_links:
print(link.get('href'))

# Extracting table data

rows = soup.find_all('tr')    # list of each <tr>
for row in rows:
row_td = row.find_all('td')   # list of each <td>

str_cells = str(row_td)
clean_text = BeauitfulSoup(str_cells, 'lxml').get_text()    # removes html tags in text

df - pd.DataFrame(clean_text)
df1 = df[0].str.split(',', expand=True)
df1[0] = df[0].str.strip('[')

col_labels = soup.find_all('th')
all_header = []
col_str = str(col_labels)
clean_text2 = BeautifulSoup(col_str, 'lxml').get_text()
all_header.append(clean_text2)
df2 = pd.DataFrame(all_header)
df3 = df2[0].str.split(',', expand=True)

frames = [df3, df1]
df4 = pd.concat(frames)
df5 = df4.rename(columns=df4.iloc[0])     # converting first row into headers
```
