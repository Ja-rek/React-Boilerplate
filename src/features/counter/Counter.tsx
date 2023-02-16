import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectCountStatus,
} from "./counterSlice";
import { Button, ButtonProps, TextField, styled } from "@mui/material";
import { Save } from "@mui/icons-material";

//pass parameters
const ParrameterButtton = styled(
  ({ test, ...p }: ButtonProps<"button"> & { test: string }) => (
    <Button {...p} />
  )
)`
  ${(p) => p.test}
`;

const StyledButton = styled(Button)`
  background: ${(p) => p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.text.primary};
  font-size: ${(p) => p.theme.spacing(3.5)};
  :hover {
    background: ${(p) => p.theme.palette.secondary.main};
  }
`;

const Row = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing(2)};
  margin: ${(p) => p.theme.spacing(1)};
`;

export function Counter() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectCountStatus);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState("2");
  const incrementValue = Number(incrementAmount) || 0;

  console.log("test");

  return (
    <>
      <Row>
        <ParrameterButtton test={"test"}>test</ParrameterButtton>
        <StyledButton
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </StyledButton>
        <TextField value={count} />
        <StyledButton
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </StyledButton>
      </Row>
      <Row>
        <TextField
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <StyledButton
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </StyledButton>
        <StyledButton
          disabled={status === "loading"}
          startIcon={status === "loading" && <Save />}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </StyledButton>
        <StyledButton onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </StyledButton>
      </Row>
    </>
  );
}
