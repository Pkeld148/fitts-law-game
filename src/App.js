import logo from "./logo.svg";
import "./App.css";

import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import ClickButton from "./ClickButton";

function App() {
  const [gameState, setGameState] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState(10);
  const [opacity, setOpacity] = useState("0");
  const [difficulty, setDifficulty] = useState("");
  const [counter, setCounter] = useState(1);
  const [timer, setTimer] = useState({ startTime: null, endTime: null });

  const easyArray = [1, 2, 3, 6, 5, 4, 7, 8, 9];
  const normalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const hardArray = [7, 2, 6, 1, 3, 8, 4, 9, 5];

  const startEasyGame = () => {
    setDifficulty("Easy");
    setGameState(1);
    setColor("success");
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

  const nextButton = () => {
    if (difficulty === "Easy") {
      setGameState(easyArray[counter]);
      setCounter(counter + 1);
    } else if (difficulty === "Normal") {
      setGameState(normalArray[counter]);
      setCounter(counter + 1);
    } else if (difficulty === "Hard") {
      setGameState(hardArray[counter]);
      setCounter(counter + 1);
    }
    if (counter === 9) {
      setTimer({ ...timer, endTime: Date.now() - timer.startTime });
    }
  };

  return (
    <>
      {counter === 10 ? (
        <>
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <h1>GOOD JOB!</h1>
          <h2>TIME: {timer.endTime}ms</h2>
          <Button
            id="try-again"
            variant="contained"
            size="large"
            sx={{ backgroundColor: "purple" }}
          >
            TRY AGAIN?
          </Button>
          </Grid>
        </>
      ) : (
        <>
          {!gameState ? (
            <Grid
              container
              id="start-game"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <h1>CLICK TO PLAY THE GAME</h1>
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  sx={{ fontSize: 50 }}
                  onClick={() => startEasyGame()}
                >
                  EASY
                </Button>
                <Button
                  variant="contained"
                  sx={{ margin: 5, fontSize: 20 }}
                  onClick={() => startNormalGame()}
                >
                  NORMAL
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ fontSize: 8 }}
                  onClick={() => startHardGame()}
                >
                  HARD
                </Button>
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
                    sx={{ fontSize: size, opacity: opacity }}
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
                    sx={{ fontSize: size, opacity: 0 }}
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
