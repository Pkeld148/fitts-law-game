import "./App.css";
import axios from "axios";

import { Button, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

let playerIDs = [];
let playerTimes = [];
let sortedPlayerTimes = [];
let labels = [];

function App() {
  const [gameState, setGameState] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState(10);
  const [opacity, setOpacity] = useState("0");
  const [difficulty, setDifficulty] = useState("");
  const [counter, setCounter] = useState(1);
  const [timer, setTimer] = useState({ startTime: null, endTime: null });
  const [data, setData] = useState({
    bestTime: null,
    averageTime: null,
    gamesPlayed: null,
  });

  const easyArray = [1, 2, 3, 6, 5, 4, 7, 8, 9];
  const normalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const hardArray = [7, 2, 6, 1, 3, 8, 4, 9, 5];

  const clickleArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1, 7, 9,
  ];

  const dummyGlobalData = {
    averageTime: 14000,
    bestTime: 9999,
    weekAverageTime: 15000,
    weekBestTime: 8888,
  };

  const dummyPersonalData = {
    averageTime: 13000,
    bestTime: 9001,
    weekAverageTime: 14000,
    weekBestTime: 9001,
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Your Times(ms)",
        data: playerTimes,
        borderColor: "rgb(0, 64, 240)",
        backgroundColor: "rgba(0, 64, 240, 0.5)",
      },
    ],
  };

  let shuffledClickleArray = clickleArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const startEasyGame = () => {
    setDifficulty("Easy");
    setGameState(1);
    setColor("success");
    setSize(50);
    setOpacity(100);
    setTimer({ ...timer, startTime: Date.now() });
  };

  const startWarmup = () => {
    setDifficulty("Easy");
    setGameState(1);
    setColor("error");
    setSize(50);
    setOpacity(100);
    setTimer({ ...timer, startTime: Date.now() });
  };

  const startNormalGame = () => {
    setDifficulty("Normal");
    setGameState(1);
    setColor("primary");
    setSize(20);
    setOpacity(100);
    setTimer({ ...timer, startTime: Date.now() });
  };

  const startHardGame = () => {
    setDifficulty("Hard");
    nextButton();
    setGameState(7);
    setColor("error");
    setSize(8);
    setOpacity(100);
    setTimer({ ...timer, startTime: Date.now() });
  };

  const resetGame = () => {
    setGameState(null);
    setCounter(1);
  };

  const nextButton = () => {
    if (difficulty === "Easy") {
      setGameState(shuffledClickleArray[counter]);
      setCounter(counter + 1);
    } else if (difficulty === "Normal") {
      setGameState(normalArray[counter]);
      setCounter(counter + 1);
    } else if (difficulty === "Hard") {
      setGameState(hardArray[counter]);
      setCounter(counter + 1);
    }
    if (counter === 19) {
      setTimer({ ...timer, endTime: Date.now() - timer.startTime });
    }
  };

  useEffect(() => {
    if (timer.endTime) {
      console.log(timer.endTime);

      axios
        .post("http://localhost:8081", {
          time: timer.endTime,
        })
        .then((response) => {
          console.log(response);
        })
        .then((response) => {
          axios.get("http://localhost:8081").then((res) => {
            console.log("Getting all data after posting? ", res);
            console.log("Array length: ", res.data.length);

            for (let i = 0; i < res.data.length; i++) {
              playerTimes.push(res.data[i].time);
              playerIDs.push(res.data[i].id);
            }
            sortedPlayerTimes = [...playerTimes].sort((a, b) => a - b);

            let timeSum = 0;
            for (let i = 0; i < sortedPlayerTimes.length; i++) {
              timeSum += sortedPlayerTimes[i];
            }

            let newAverageTime = timeSum / sortedPlayerTimes.length;

            console.log("Sorted Array: ", sortedPlayerTimes);
            console.log("Average: ", newAverageTime);
            setData({
              bestTime: sortedPlayerTimes[0],
              averageTime: newAverageTime.toFixed(0),
              gamesPlayed: sortedPlayerTimes.length,
            });
            labels = playerIDs;
          });
        });
    }
  }, [timer.endTime]);

  useEffect(() => {
    if (data.bestTime) {
      console.log("Player data updated?", data);
      console.log("Player Times Array: ", playerTimes);
      console.log("Player IDs Array: ", playerIDs);
    }
  }, [data.bestTime]);

  return (
    <>
      {counter === 20 ? (
        <>
          <Grid
            container
            className="full"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1>GOOD JOB!</h1>
            <h2>YOUR TIME: {timer.endTime}ms</h2>
            <Button
              id="try-again"
              variant="contained"
              size="large"
              sx={{ backgroundColor: "purple" }}
              onClick={() => resetGame()}
            >
              TRY AGAIN?
            </Button>
          </Grid>
          <Grid
            container
            className="stats"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              className="personal-stats"
            >
              <h1>CAREER STATS</h1>
              <h2>Games Played: {data.gamesPlayed}</h2>
              <h2>Average Time: {data.averageTime}ms</h2>
              <h2>Best Time: {data.bestTime}ms</h2>
            </Grid>
            {/* <Grid
              item
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              className="global-stats"
            >
              <h1>GLOBAL STATS</h1>
              <h2>Average Time: {dummyGlobalData.averageTime}</h2>
              <h2>Best Time: {dummyGlobalData.bestTime}</h2>
              <h2>
                Average Time (Past 7 Days): {dummyGlobalData.weekAverageTime}
              </h2>
              <h2>Best Time(Past 7 Days): {dummyGlobalData.weekBestTime}</h2>
            </Grid> */}

            <Grid
              item
              justifyContent="center"
              alignItems="center"
              style={{ width: "800px" }}
            >
              <Line data={chartData}></Line>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {!gameState ? (
            <Grid
              container
              className="full"
              id="start-game"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <h1 id="title">CLICKLE</h1>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{ fontSize: 50, borderRadius: 50 }}
                    onClick={() => startEasyGame()}
                  >
                    START
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ margin: 5, fontSize: 50, borderRadius: 50 }}
                    onClick={() => startWarmup()}
                  >
                    Warmup
                  </Button>
                </Grid> */}
                {/* <Grid item>
                  <Button
                    variant="contained"
                    sx={{ margin: 5, fontSize: 20 }}
                    onClick={() => startNormalGame()}
                  >
                    NORMAL
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    sx={{ fontSize: 8 }}
                    onClick={() => startHardGame()}
                  >
                    HARD
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              id="boxes"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
            >
              {gameState === 1 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}
              {gameState === 2 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}
              {gameState === 3 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}{" "}
              {gameState === 4 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}{" "}
              {gameState === 5 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}{" "}
              {gameState === 6 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}
              {gameState === 7 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}
              {gameState === 8 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}
              {gameState === 9 ? (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    sx={{ fontSize: size, opacity: opacity, borderRadius: 50 }}
                    onClick={() => nextButton()}
                  >
                    CLICK
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color={color}
                    disabled
                    sx={{ fontSize: size, opacity: 0, borderRadius: 50 }}
                  >
                    CLICK
                  </Button>
                </Grid>
              )}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export default App;
