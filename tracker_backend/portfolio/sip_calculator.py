def simulate_sip(monthly_investment, annual_rate, years):
    months = years * 12
    monthly_rate = annual_rate / 12 / 100

    future_value = 0
    yearly_breakdown = {}

    for i in range(1, months + 1):
        future_value += monthly_investment * ((1 + monthly_rate) ** (months - i))

        if i % 12 == 0:
            year = int(i / 12)
            year_label = str(2025 + year - 1)  # You can adjust start year if needed
            yearly_breakdown[year_label] = round(future_value, 2)

    total_invested = monthly_investment * months
    profit = future_value - total_invested
    yearly_breakdown_list = [
    {"year": year, "value": round(value, 2)}
    for year, value in yearly_breakdown.items()
]

    return {
        "monthly_investment": monthly_investment,
        "years": years,
        "expected_annual_return": annual_rate,
        "total_invested": round(total_invested, 2),
        "future_value": round(future_value, 2),
        "profit": round(profit, 2),
        "yearly_breakdown": yearly_breakdown_list
    }
