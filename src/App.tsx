import { useEffect, useState } from "react";
import { Layout, Typography, theme } from "antd";

import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [grid, setGrid] = useState(() => createGrid(50, 50, 500));

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((grid) => {
        const newGrid = grid.map((row, i) =>
          row.map((cell, j) => {
            const neighbors = [
              grid?.[i - 1]?.[j - 1],
              grid?.[i - 1]?.[j],
              grid?.[i - 1]?.[j + 1],
              grid?.[i]?.[j - 1],
              grid?.[i]?.[j + 1],
              grid?.[i + 1]?.[j - 1],
              grid?.[i + 1]?.[j],
              grid?.[i + 1]?.[j + 1],
            ].filter(Boolean).length;
            if (cell) {
              return neighbors === 2 || neighbors === 3;
            } else {
              return neighbors === 3;
            }
          }),
        );
        return newGrid;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const gridComponents = grid.map((row, i) => (
    <div key={i} style={{ height: 15 }}>
      {row.map((cell, j) => (
        <div
          key={`${i}-${j}`}
          style={{
            display: "inline-block",
            width: 15,
            height: 15,
            background: cell ? "#B1CF5F" : "#755D57",
            borderWidth: ``,
            borderTop: i === 0 ? `1px` : 0,
            borderBottom: "1px",
            borderLeft: j === 0 ? `1px` : 0,
            borderRight: "1px",
            borderColor: "transparent",
            borderStyle: "solid",
          }}
        />
      ))}
      <br />
    </div>
  ));
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Title level={4} style={{ color: "white", margin: 0 }}>
          {"Game of Life"}
        </Title>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {gridComponents}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

function createGrid(rows: number, cols: number, initialLifeCount: number) {
  const grid = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(false));
  let lifeCount = 0;
  while (lifeCount < initialLifeCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!grid[row][col]) {
      grid[row][col] = true;
      lifeCount++;
    }
  }
  return grid;
}

export default App;
