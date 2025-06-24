def rungekutta(f, n, x0, y0, h):
    x = x0
    y = y0 
    points = []
    while x <= n:
        points.append((x,y))
        k1 = f(x, y)
        k2 = f(x + (h / 2), y + h * (k1 / 2))
        k3 = f(x + (h / 2), y + h * (k2 / 2))
        k4 = f(x + h, y + h * k3)
        y += (h/6) * (k1 + (2 * k2) + (2 * k3) + (k4))
        x += h
    return points

