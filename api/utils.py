import math
from scipy.stats import norm

def black_scholes(S, K, t, r, sig):

    d1 = ((math.log(S/K)) + (r + 0.5 * sig ** 2) * t) / (sig * math.sqrt(t))
    d2 = d1 - sig * math.sqrt(t)
    
    call = S * norm.cdf(d1) - K * math.exp(-r * t) * norm.cdf(d2)
    put = (S * math.exp(-r * t) * norm.cdf(-d2)) - (S * norm.cdf(-d1))

    return round(call, 2), round(put, 2)

