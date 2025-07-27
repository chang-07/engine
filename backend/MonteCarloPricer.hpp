#pragma once
#include <string>
#include <utility>

bool is_call_option(const std::string& type);

std::pair<double, double> monte_carlo_price(double S, double K, double r, double sigma, double T, int nSims);
