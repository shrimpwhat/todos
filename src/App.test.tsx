import { render, screen, fireEvent } from "@testing-library/react"
import { expect, test } from "vitest"
import App from "./App"

test("renders initial todos", () => {
  render(<App />)
  expect(screen.getByText("Пример 1")).toBeInTheDocument()
  expect(screen.getByText("Пример 2")).toBeInTheDocument()
  expect(screen.getByText("Пример 3")).toBeInTheDocument()
})

test("adds a new todo", () => {
  render(<App />)
  const input = screen.getByPlaceholderText("What needs to be done?")
  fireEvent.change(input, { target: { value: "New Todo" } })
  fireEvent.submit(input)
  expect(screen.getByText("New Todo")).toBeInTheDocument()
})

test("toggles a todo", () => {
  const { container } = render(<App />)
  const item = container.querySelector(".items > li > label")!
  expect(item).not.toBe(null)

  fireEvent.click(item)
  expect(item.querySelector("input")).toBeChecked()
  expect(item.querySelector("svg")).toBeInTheDocument()
  expect(item.querySelectorAll("span")[1]).toHaveClass("line-through")
})

test("filters active todos", () => {
  render(<App />)
  const activeFilter = screen.getByText("Active")
  fireEvent.click(activeFilter)
  expect(screen.queryByText("Пример 2")).not.toBeInTheDocument()
  expect(screen.getByText("Пример 1")).toBeInTheDocument()
  expect(screen.getByText("Пример 3")).toBeInTheDocument()

  fireEvent.click(screen.getByText("Пример 1"))
  expect(screen.queryByText("Пример 1")).not.toBeInTheDocument()
})

test("filters completed todos", () => {
  render(<App />)
  const completedFilter = screen.getByText("Completed")
  fireEvent.click(completedFilter)
  expect(screen.getByText("Пример 2")).toBeInTheDocument()
  expect(screen.queryByText("Пример 1")).not.toBeInTheDocument()
  expect(screen.queryByText("Пример 3")).not.toBeInTheDocument()

  fireEvent.click(screen.getByText("Пример 2"))
  expect(screen.queryByText("Пример 2")).not.toBeInTheDocument()
})

test("clears completed todos", () => {
  render(<App />)
  const clearButton = screen.getByText("Clear completed")
  fireEvent.click(clearButton)
  expect(screen.queryByText("Пример 2")).not.toBeInTheDocument()
})

test("displays correct count of items left", () => {
  render(<App />)

  expect(screen.getByText("2 items left")).toBeInTheDocument()
  fireEvent.click(screen.getByText("Пример 1"))
  expect(screen.getByText("1 items left")).toBeInTheDocument()

  fireEvent.click(screen.getByText("Completed"))
  fireEvent.click(screen.getByText("Пример 1"))

  expect(screen.getByText("2 items left")).toBeInTheDocument()
})

test("empty todo should not add to list", () => {
  const { container } = render(<App />)
  expect(container.querySelector(".items")?.children).toHaveLength(3)
  const input = screen.getByPlaceholderText("What needs to be done?")
  fireEvent.submit(input)
  expect(container.querySelector(".items")?.children).toHaveLength(3)
})
