/*global describe, it, expect, $ */
(function () {

    'use strict';
    
    describe('summary use jQuery to print all scores', function () {

        // answer to question 2
        function summary(logger) {
            $.getJSON("http://basketball.example.com/thisweek.json", function (data) {
                var i;
                function printLine(gameData) {
                    var teamA = gameData.teams[0],
                        teamB = gameData.teams[1];
                    logger.log([teamA.name, teamA.score, '-', teamB.score, teamB.name].join(' '));
                }
                for (i = 0; i < data.games.length; i += 1) {
                    $.getJSON(data.games[i].url, printLine);
                }
            });
        }

        // test case
        // mock $
        var $ = {
            getJSON: function (url, callback) {
                switch (url) {
                case "http://basketball.example.com/thisweek.json":
                    callback({
                        "week": "51st of 2011",
                        "games": [
                            { "url": "http://basketball.example.com/game/1" },
                            { "url": "http://basketball.example.com/game/2" },
                            { "url": "http://basketball.example.com/game/3" },
                            { "url": "http://basketball.example.com/game/4" }
                        ]
                    });
                    break;
                case "http://basketball.example.com/game/1":
                    callback({
                        "id": "1",
                        "teams": [{
                            "name": "Lakers",
                            "score": 79
                        }, {
                            "name": "Bulls",
                            "score": 99
                        }]
                    });
                    break;
                case "http://basketball.example.com/game/2":
                    callback({
                        "id": "2",
                        "teams": [{
                            "name": "Rocket",
                            "score": 93
                        }, {
                            "name": "Bulls",
                            "score": 77
                        }]
                    });
                    break;
                case "http://basketball.example.com/game/3":
                    callback({
                        "id": "3",
                        "teams": [{
                            "name": "Lakers",
                            "score": 67
                        }, {
                            "name": "Rocket",
                            "score": 88
                        }]
                    });
                    break;
                case "http://basketball.example.com/game/4":
                    callback({
                        "id": "4",
                        "teams": [{
                            "name": "Kaikai",
                            "score": 1
                        }, {
                            "name": "Rocket",
                            "score": 99
                        }]
                    });
                    break;
                default:
                    throw new Error("404");
                }
            }
        };

        it('should work', function () {
            var results = [];
            summary({
                log: function (msg) {
                    results.push(msg);
                }
            });

            expect(results.length).toEqual(4);
            expect(results[0]).toEqual('Lakers 79 - 99 Bulls');
            expect(results[1]).toEqual('Rocket 93 - 77 Bulls');
            expect(results[2]).toEqual('Lakers 67 - 88 Rocket');
            expect(results[3]).toEqual('Kaikai 1 - 99 Rocket');
        });
    });
    
}());