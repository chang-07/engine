cmake_minimum_required(VERSION 3.15)
project(MonteCarloBackend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(${CMAKE_SOURCE_DIR}/external)
include_directories(/opt/homebrew/include)


add_executable(server
    main.cpp
    MonteCarloPricer.cpp
)

target_link_libraries(server PRIVATE pthread)
