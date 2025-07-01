def heun(f, n, x0, y0, h):
    points = []
    x = x0
    y = y0 
    approx = 0;
    while x <= n:
        points.append((x, y))
        approx = y + h * f(x,y)
        y = y + ((h/2) * (f(x,y) + f(x + h, approx)))
        x += h
    return points
