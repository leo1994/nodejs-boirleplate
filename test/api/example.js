describe("GET - /", () => {
  it("Should return 404", async () => {
    const response = await request.get("/");
    expect(response.status).to.be.equal(404);
  });
});
