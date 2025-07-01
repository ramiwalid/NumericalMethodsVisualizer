from ast import parse
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from Algorithms.euler import euler 
from Algorithms.heun import heun
from Algorithms.rungekutta4 import rungekutta
from sympy import symbols, lambdify 
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
from pydantic import BaseModel
from typing import List, Tuple 
import uvicorn

class Parameters(BaseModel):
    equation: str
    x_initial: float 
    y_initial: float 
    step_size: float 
    x_end: float

class Points(BaseModel):
    points: List[Tuple[float, float]] 

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

parameters = [] 

@app.post("/")
async def getParameters(data: Parameters):
    x, y = symbols('x y')
    transformations = standard_transformations + (implicit_multiplication_application,)
    f = parse_expr(data.equation, transformations=transformations)
    f_lambda = lambdify((x,y), f)

    euler_result = euler(f_lambda, data.x_initial, data.y_initial, data.step_size, data.x_end)
    heun_result = heun(f_lambda, data.x_end, data.x_initial, data.y_initial, data.step_size) 
    rungekutta_result = rungekutta(f_lambda, data.x_end, data.x_initial, data.y_initial, data.step_size)

    return {"method": "Euler", "points": euler_result} 
