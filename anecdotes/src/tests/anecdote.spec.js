import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "../services/anecdotes";
import useAnecdoteStore, {
  useAnecdotes,
  useFilter,
  useAnecdotesActions,
} from "../components/store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdotesActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("the store gives anecdotes sorted by votes", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Test1", votes: 1 },
      { id: 2, content: "Test0", votes: 0 },
      { id: 3, content: "Test3", votes: 3 },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(
      mockAnecdotes.toSorted((a, b) => b.votes - a.votes),
    );
  });

  it("the store gives anecdotes filtered", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Test1", votes: 1 },
      { id: 2, content: "AnecdoteTest", votes: 0 },
      { id: 3, content: "Test3", votes: 3 },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    act(() => {
      result.current.setFilter("test");
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(
      mockAnecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .filter((a) => a.content.toLowerCase().includes("test")),
    );
  });

  it("voting increases the number of votes for an anecdote", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test1", votes: 1 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
    anecdoteService.update.mockResolvedValue({
      ...mockAnecdotes[0],
      votes: mockAnecdotes[0].votes + 1,
    });

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current[0].votes).toEqual(mockAnecdotes[0].votes);

    await act(async () => {
      await result.current.vote(1);
    });

    expect(anecdotesResult.current[0].votes).toEqual(
      mockAnecdotes[0].votes + 1,
    );
  });
});
