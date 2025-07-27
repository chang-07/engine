#include "MonteCarloPricer.hpp"
#include <random>
#include <cmath>
#include <vector>
#include <numeric>

std::pair<double, double> monte_carlo_price(double S, double K, double r, double sigma, double T, int nSims) {
    std::default_random_engine gen(std::random_device{}());
    std::normal_distribution<double> norm(0.0, 1.0);

    std::vector<double> call_payoffs;
    std::vector<double> put_payoffs;

    for (int i = 0; i < nSims; ++i) {
        double Z = norm(gen);
        double ST = S * exp((r - 0.5 * sigma * sigma) * T + sigma * Z * sqrt(T));
        call_payoffs.push_back(std::max(ST - K, 0.0));
        put_payoffs.push_back(std::max(K - ST, 0.0));
    }

    double call_price = exp(-r * T) * (std::accumulate(call_payoffs.begin(), call_payoffs.end(), 0.0) / nSims);
    double put_price = exp(-r * T) * (std::accumulate(put_payoffs.begin(), put_payoffs.end(), 0.0) / nSims);

    return {call_price, put_price};
}

