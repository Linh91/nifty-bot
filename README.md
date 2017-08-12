# Nifty-bot

                                            ,--.    ,--.
                                           ((O ))--((O ))
                                         ,'_`--'____`--'_`.
                                        _:  ____________  :_
                                       | | ||::::::::::|| | |
                                       | | ||::::::::::|| | |
                                       | | ||::::::::::|| | |
                                       |_| |/__________\| |_|
                                         |________________|
                                      __..-'            `-..__
                                   .-| : .----------------. : |-.
                                 ,\ || | |\______________/| | || /.
                                /`.\:| | ||  __  __  __  || | |;/,'\
                               :`-._\;.| || '--''--''--' || |,:/_.-':
                               |    :  | || .----------. || |  :    |
                               |    |  | || '----SSt---' || |  |    |
                               |    |  | ||   _   _   _  || |  |    |
                               :,--.;  | ||  (_) (_) (_) || |  :,--.;
                               (`-'|)  | ||______________|| |  (|`-')
                                `--'   | |/______________\| |   `--'
                                       |____________________|
                                        `.________________,'
                                         (_______)(_______)
                                         (_______)(_______)
                                         (_______)(_______)
                                         (_______)(_______)
                                        |        ||        |
                                        '--------''--------'

This is a robot application that can take commands, navigate to crates, load from crates and navigates to conveyor-belt.

<bold>*Technologies: Node.js, Mocha, JavaScript*</bold>

### Input
- Give x, y cordinates for conveyor-belt
- Give x, y cordinates for robot start position
- Give description for crates; x, y cordinates and amount of bags
- Give set of instructions for robot to perform e.g. "NSPPWSSD"

### Instructions
N - "north"
S - "south"
W - "west"
### Output
An output will be given which will include:
- amount of bags picked up
- cordinates of robot position and status of robot

### Examples of test runs

<img src="https://user-images.githubusercontent.com/17644847/28984123-50bb969c-7954-11e7-8242-fa9e2e7cd4ea.png" width="350"><img src="https://user-images.githubusercontent.com/17644847/28984125-50bfc32a-7954-11e7-916c-88305ab36559.png" width="350">
<img src="https://user-images.githubusercontent.com/17644847/28984124-50beecca-7954-11e7-9cb5-aabe75771e5f.png" width="350">

### How to get started

<code> git clone https://github.com/Linh91/nifty-bot.git </code> <br>
<code> npm install </code><br>
node console => <code> node </code><br>
<code> const Warehouse = require('./model/warehouse.js') </code><br>
<code> var warehouse = new Warehouse() </code>

### How to run test 

<code> npm test </code> <br>

<img src="https://user-images.githubusercontent.com/17644847/28983396-7441fa00-7951-11e7-9e47-39f8d3d716fb.png" width="400" height="400"><img src="https://user-images.githubusercontent.com/17644847/28983657-a6a0c7a0-7952-11e7-925c-3905005999bb.png">
