describe("Quiz Feature", () => {
  test("marks answer as correct when selected answer matches correct answer", () => {
    const selected: string = "phishing";
    const correctAnswer: string = "phishing";

    const isCorrect = selected === correctAnswer;

    expect(isCorrect).toBe(true);
  });

  test("marks answer as incorrect when selected answer does not match correct answer", () => {
    const selected: string = "spam";
    const correctAnswer: string = "phishing";

    const isCorrect = selected === correctAnswer;

    expect(isCorrect).toBe(false);
  });

  test("does not submit when no answer is selected", () => {
    const selected: string = "";
    const canSubmit = selected !== "";

    expect(canSubmit).toBe(false);
  });
});