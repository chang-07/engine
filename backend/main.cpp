#include "MonteCarloPricer.hpp"
#include <nlohmann/json.hpp>
#include "external/crow_all.h"

using json = nlohmann::json;

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/price").methods("POST"_method)([](const crow::request& req){
        auto body = json::parse(req.body);

        double S = body["S"];
        double K = body["K"];
        double r = body["r"];
        double sigma = body["sigma"];
        double T = body["T"];
        int n = body["nSims"];
        bool isCall = body["type"] == "call";

        auto prices = monte_carlo_price(S, K, r, sigma, T, n);

        json response = { 
            { "call_price", prices.first },
            { "put_price", prices.second }
        };
        return crow::response{ response.dump() };
    });

    app.port(18080).multithreaded().run();
}
