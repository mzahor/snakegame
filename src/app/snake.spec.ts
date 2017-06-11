import Snake from "./snake";

describe("Snake", () => {
    let snake: Snake;

    beforeEach(() => {
        snake = new Snake({
            x: 10,
            y: 10,
        });
    });

    it("create a snake with a head", () => {
        expect(snake.getHead()).toEqual(jasmine.objectContaining({
            x: 10,
            y: 10,
        }));
    });

    describe("#isHeadHere", () => {
        it("should return true if head is here", () => {
            expect(snake.isHeadHere(10, 10)).toBe(true);
        });

        it("should return false if head is not here", () => {
            expect(snake.isHeadHere(undefined, undefined)).toBe(false);
            expect(snake.isHeadHere(10, 0)).toBe(false);
            expect(snake.isHeadHere(0, 10)).toBe(false);
            expect(snake.isHeadHere(5, 3)).toBe(false);
            expect(snake.isHeadHere(10, NaN)).toBe(false);
            expect(snake.isHeadHere(NaN, 10)).toBe(false);
        });
    });

    describe("#move", () => {
        it("should move down", () => {
            snake.move(0, 1);

            expect(snake.snake).toEqual([{
                x: 10,
                y: 11,
            }]);
        });

        it("should move up", () => {
            snake.move(0, -1);

            expect(snake.snake).toEqual([{
                x: 10,
                y: 9,
            }]);
        });

        it("should move left", () => {
            snake.move(-1, 0);

            expect(snake.snake).toEqual([{
                x: 9,
                y: 10,
            }]);
        });

        it("should move right", () => {
            snake.move(1, 0);

            expect(snake.snake).toEqual([{
                x: 11,
                y: 10,
            }]);
        });
    });
});
