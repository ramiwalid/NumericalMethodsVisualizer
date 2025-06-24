def euler(f, x0, y0, h, n):
    points = []
    x = x0;
    y = y0;
    while x <= n:
        points.append((x, y))
        x += h
        y += h * f(x,y)
    return points


