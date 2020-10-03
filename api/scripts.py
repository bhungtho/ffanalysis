import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd
import json
from GoogleNews import GoogleNews

def player_point_progression(name):
    # get data into dataframes
    players_2019 = pd.read_json('2019.json')
    players_2018 = pd.read_json('2018.json')
    players_2017 = pd.read_json('2017.json')
    players_2016 = pd.read_json('2016.json')
    players_2015 = pd.read_json('2015.json')
    
    fp_2019 = 0
    fp_2018 = 0
    fp_2017 = 0
    fp_2016 = 0
    fp_2015 = 0

    if name in players_2019.values:
        fp_2019 = (players_2019.loc[players_2019['Player'] == name])['FantasyPoints'].values[0]
    if name in players_2018.values:
        fp_2018 = (players_2018.loc[players_2018['Player'] == name])['FantasyPoints'].values[0]
    if name in players_2017.values:
        fp_2017 = (players_2017.loc[players_2017['Player'] == name])['FantasyPoints'].values[0]
    if name in players_2016.values:
        fp_2016 = (players_2016.loc[players_2016['Player'] == name])['FantasyPoints'].values[0]
    if name in players_2015.values:
        fp_2015 = (players_2015.loc[players_2015['Player'] == name])['FantasyPoints'].values[0]

    x = [2015, 2016, 2017, 2018, 2019]
    y = [fp_2015, fp_2016, fp_2017, fp_2018, fp_2019]

    plt.plot(x, y)
    plt.xticks(range(2015, 2020))
    plt.title('Fantasy Points Progression for ' + name)
    plt.xlabel('Year')
    plt.ylabel('Fantasy Points')

    plt.savefig('./../src/media/playerptprog.png')

    plt.close()

def compare_player_position(name):
    players_2019 = pd.read_json('2019.json')
    position = fp_2019 = (players_2019.loc[players_2019['Player'] == name])['Pos'].values[0]

    for i,j in players_2019.iterrows():
        if(j['Pos'] == position):
            att_tgt = j['Tgt'] + j['PassingAtt'] + j['RushingAtt']
            if(j['Player'] == name):
                plt.scatter(att_tgt, j['FantasyPoints'], color = 'red')
            else:
                plt.scatter(att_tgt, j['FantasyPoints'], color = 'blue')

    plt.title(name + ' versus other ' + position + 's')
    plt.ylabel('Fantasy Points')
    plt.xlabel('Targets & Attempts')

    plt.savefig('./../src/media/compplayer.png')

    plt.close()

def compare_point_sources(name):
    players_2019 = pd.read_json('2019.json')

    rushing_yds = (players_2019.loc[players_2019['Player'] == name])['RushingYds'].values[0]
    rushing_tds = (players_2019.loc[players_2019['Player'] == name])['RushingTD'].values[0]
    rushing_pts = max(rushing_yds * .1 + rushing_tds * 6, 0)

    receiving_yds = (players_2019.loc[players_2019['Player'] == name])['ReceivingYds'].values[0]
    receiving_tds = (players_2019.loc[players_2019['Player'] == name])['ReceivingTD'].values[0]
    receiving_pts = max(receiving_yds * .1 + receiving_tds * 6, 0)

    passing_yds = (players_2019.loc[players_2019['Player'] == name])['PassingYds'].values[0]
    passing_tds = (players_2019.loc[players_2019['Player'] == name])['PassingTD'].values[0]
    passing_pts = max(passing_yds * .025 + passing_tds * 4, 0)

    # total_pts = rushing_pts + receiving_pts + passing_pts

    labels = 'Rushing', 'Receiving', 'Passing'
    points = [rushing_pts, receiving_pts, passing_pts]

    plt.pie(points, labels = labels, autopct='%1.1f%%')

    plt.title('Point Sources for ' + name)

    plt.savefig('./../src/media/pointsources.png')

    plt.close()

def get_headlines(name):
    google_news = GoogleNews(lang = 'en', encode = 'utf-8')
    google_news.search(name)

    result = google_news.result()[:5]

    output = []
    for i in range(5):
        #print(result[i])
        output.append((result[i]['title'], result[i]['link']))

    return output

#get_headlines('Todd Gurley')