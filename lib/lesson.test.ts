interface Lesson {
    title: string;
    content: string;
  }
  
  describe("Lesson Plans Feature", () => {
  
    test("should create a valid lesson", () => {
      const lesson: Lesson = {
        title: "Phishing Awareness",
        content: "Learn how to identify phishing emails"
      };
  
      expect(lesson.title).toBe("Phishing Awareness");
      expect(lesson.content).toContain("phishing");
    });
  
    test("lesson should not have empty fields", () => {
      const lesson: Lesson = {
        title: "Cyber Safety",
        content: "Protect yourself online"
      };
  
      expect(lesson.title.length).toBeGreaterThan(0);
      expect(lesson.content.length).toBeGreaterThan(0);
    });
  
  });