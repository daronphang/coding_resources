import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime
import shutil
import os

'''
Python script for pulling weekly SPC OOC%
Extensible to all modules if needed
outputs in HTML which can be viewed on any browser 

Requirements:
1. png-plots folder MUST be present in the cwd
'''

ooc_limit = {
    "CSPL": 1,
    "PML": 1.5,
    "Area": 2.5
}

intermediary_ooc_data = []
ooc_data = []
last_ww = None

def populate_empty_rows_algo(unique_ww, df):
    def binary_search():
        start = 0
        end = len(df) - 1
        mid = (end - start) // 2
        
        while start < end:

            if df.iloc[mid]['WW'] != unique_ww[mid]:
                # before midpoint, there exists missing values
                end = mid
                mid = (end - start) // 2
            else:
                # values are matched before midpoint
                start = mid + 1
                mid = start + (end - start) // 2
        return mid
    
    while True:
        if len(df) == len(unique_ww):
            break

        mid = binary_search()
        if df.iloc[mid]['WW'] == unique_ww[mid] and mid + 1 == len(df):
            # add remainder to df
            missing_df = pd.DataFrame({'WW': unique_ww[mid+1:], 'ooc': [np.nan] * len(unique_ww[mid+1:])})
            df = pd.concat([df, missing_df]).reset_index(drop=True)
        else:
            missing_df = pd.DataFrame({'WW': [unique_ww[mid]], 'ooc': [np.nan]})
            df = pd.concat([df.iloc[:mid], missing_df, df.iloc[mid:]]).reset_index(drop=True)

    return df

def plot_by_fab(grp_df, fab, ooc_limit, last_ww, ax):
    fab_df = grp_df[grp_df['Fab'] == fab]
    ooc_df = fab_df[(fab_df['ooc'] > ooc_limit) & (fab_df['WW'] == last_ww)].reset_index().to_dict('records')

    # adding ooc for f10w
    if fab == 'F10W' and len(ooc_df) > 0:
        intermediary_ooc_data.extend(ooc_df)

    fab_df = fab_df[['WW', 'ooc']]
    if (len(fab_df) > 0):
        if (len(fab_df) < 15):
            # to populate missing weeks with NaN
            fab_df = populate_empty_rows_algo(unique_ww, fab_df)

        ax.plot(fab_df['WW'], fab_df['ooc'], label=fab, marker ='.')

        # adding text labels for each point
        for x, y in zip(fab_df['WW'], fab_df['ooc']):
            ax.annotate(text=f'{round(y, 2)}%', xy=(x, y), textcoords='offset points', xytext=(0, 5), ha='center', fontsize=7)



# 15 work weeks per plot
def plot_ooc_charts(grp_df, unique_ww, area, design_id, chart_type):
    # each chart is based on DID and chart type i.e. B47R CSPL, B47R PML, B47R AREA

    fig = plt.figure()
    ax = fig.add_subplot()

    grp_df = grp_df[
        (grp_df['Area'] == area) &
        (grp_df['Design Id'] == design_id) &
        (grp_df['Chart Type'] == chart_type) 
    ]

    # plot f10w and f10n
    plot_by_fab(grp_df, 'F10N', ooc_limit[chart_type], unique_ww[len(unique_ww) - 1], ax)
    plot_by_fab(grp_df, 'F10W', ooc_limit[chart_type], unique_ww[len(unique_ww) - 1], ax)

    # adding limit horizontal line
    ax.axhline(y=ooc_limit[chart_type], color='red')

    # rotating x-axis labels
    plt.xticks(rotation=90)

    # coloring regions between OOC horizontal line
    bottom, top = plt.ylim()
    plt.ylim(-0.2, top + 1)
    ax.axhspan(-0.2, ooc_limit[chart_type], color='#EFF8E7')
    ax.axhspan(ooc_limit[chart_type], top + 1, color='#FFE2D7')

    ax.legend()
    fig.savefig(f'png-plots/{area}-{design_id}-{chart_type}.png', bbox_inches='tight')
    plt.close()

def generate_html_table(design_id_list, chart_types, area):
        table_headers = '''
        <tr>
            <th>Design ID</th>
            <th>CSPL</th>
            <th>PML</th>
            <th>AREA</th>
        </tr>
        '''

        table_rows = ''

        for design_id in design_id_list:
            table_cells = f'<td>{design_id}</td>'
            for chart in chart_types:
                img_html = f"<img src ='png-plots\\{area}-{design_id}-{chart}.png' class='img-thumbnail'>"
                table_cells += '<td>' + img_html + '</td>'

            table_rows += '<tr>' + table_cells + '</tr>'
        
        html_table = '<table class="table table-bordered">' + table_headers + table_rows + '</table>'
        return html_table

def generate_html(ww_date, ooc_data, snapshot_table):
    # using boostrap CSS

    html_template = f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title> Weekly SPC OOC% Snapshots </title>
            <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
        </head>
        <body class='container-fluid'>
            <i>This notice is automated using Python. Thanks.</i>
            <br>
            <h3> Weekly SPC OOC% Snapshots {ww_date}</h3>
            <br>
            <h4> Failed Charts </h4>
            <br>
            {ooc_data}
            <br>
            <h4>Snapshots</h4>
            <br>
            {snapshot_table}
            <i>All information and attachments in this e-mail are Proprietary and Confidential property of Micron Technology, Inc.</i>
        </body>
    </html>
    '''

    with open('spc_diffusion.html', 'w') as f:
        f.write(html_template)
    

if __name__ == '__main__':
    cw = os.getcwd()

    shutil.copyfile(
        r"\\tsfsspcweb\SPC_Web\100S\SPC program\PML\OOC.csv",
        r"SPCrawdata.csv"
    )
    design_ids = ['B16A', 'B16C', 'B17A', 'N18A', 'B27A', 'B27B', 'B27C', 'N28A', 'B47R', 'N48R', 'UNKNOWN']
    areas = ['DIFFUSION']
    fabs = ['F10W']
    chart_types = ['CSPL', 'PML', 'Area']

    raw_df = pd.read_csv("SPCrawdata.csv", encoding="cp1252")
    spc_df = raw_df[
        [
            "WW",
            "Fab",
            "Area",
            "Chart Type",
            "Chart Id",
            "Design Id",
            "PROCESS_TOOL",
            "STEP",
            "Uploaded #Samples",
            "Any Violation #OOC(1)",
            "Parameter",
            "OOC_Type"
        ]
    ].dropna()

    # get unique WW for x-axis plotting
    unique_ww = spc_df['WW'].unique()
    unique_ww.sort()
    first_ww = unique_ww[len(unique_ww) % 15]
    unique_ww = [x for x in unique_ww if x >= first_ww]
    last_ww = unique_ww[len(unique_ww) - 1]

    # filter last 15 WWs
    spc_df = spc_df[spc_df['WW'] >= first_ww]

    # perform initial groupings
    spc_groups = spc_df.groupby(['Fab', 'Area', 'Design Id', 'Chart Type', 'WW'])

    # calculate sum and ooc% for each work week and fab
    grp_df = spc_groups[['Uploaded #Samples', 'Any Violation #OOC(1)']].sum()
    grp_df['ooc'] = (grp_df['Any Violation #OOC(1)'] / grp_df['Uploaded #Samples']) * 100

    for area in areas:
        for design_id in design_ids:
            for chart_type in chart_types:
                plot_ooc_charts(grp_df.reset_index(), unique_ww, area, design_id, chart_type)

    # concatanenating datafarmes is slow, to append to list as dict and initialize again once ready
    for fab in fabs:
        for area in areas:
            for item in intermediary_ooc_data:
                ooc_df = spc_groups.get_group((fab, area, item['Design Id'], item['Chart Type'], last_ww)).drop(['WW', 'Area', 'Fab'], axis=1)
                ooc_data.extend(ooc_df[ooc_df['Any Violation #OOC(1)'] > 0].to_dict('records'))


    # output to HTML
    ooc_data = pd.DataFrame(ooc_data).reset_index(drop=True).to_html(classes='table table-striped')
    ww_date = last_ww + ' ' + datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    snapshot_table = generate_html_table(design_ids, chart_types, 'DIFFUSION')
    
    generate_html(ww_date, ooc_data, snapshot_table)
    

