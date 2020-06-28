import matplotlib.pyplot as plt
import pandas as pd
import json

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

    plt.savefig('playerptprog.png')

    print(fp_2019)
    print(fp_2018)
    print(fp_2017)
    print(fp_2016)
    print(fp_2015)

player_point_progression('Christian McCaffrey')