#include <stdlib.h>
#include <math.h>
#include <emscripten.h>

#define NUM_SNOWFLAKES 300
#define SPEED_X_MIN -5
#define SPEED_X_MAX 20
#define SPEED_Y_MIN 10
#define SPEED_Y_MAX 50
#define RADIUS_MIN 5
#define RADIUS_MAX 30

typedef struct
{
  float x, y;
  float speedX;
  float speedY;
  float opacity;
  float radius;
} Snowflake;

Snowflake snowflakes[NUM_SNOWFLAKES];

// Generate a random integer between A and B.
int rangedRandom(int min, int max)
{
  return (rand() % max) + min;
}

EMSCRIPTEN_KEEPALIVE
void init_snowflakes(int width, int height)
{
  for (int i = 0; i < NUM_SNOWFLAKES; i++)
  {
    snowflakes[i].x = rand() % width;
    snowflakes[i].y = rand() % height;
    snowflakes[i].speedX = rangedRandom(SPEED_X_MIN, SPEED_X_MAX) * 0.1;
    snowflakes[i].speedY = rangedRandom(SPEED_Y_MIN, SPEED_Y_MAX) * 0.1;
    snowflakes[i].opacity = rangedRandom(0, 10) * 0.1;
    snowflakes[i].radius = rangedRandom(RADIUS_MIN, RADIUS_MAX) * 0.1;
  }
}

EMSCRIPTEN_KEEPALIVE
void update_snowflakes(int width, int height)
{
  for (int i = 0; i < NUM_SNOWFLAKES; i++)
  {
    snowflakes[i].x += snowflakes[i].speedX;
    snowflakes[i].y += snowflakes[i].speedY;
    if (snowflakes[i].y > height)
    {
      snowflakes[i].y = 0;
      snowflakes[i].x = rand() % width;
    }
  }
}

EMSCRIPTEN_KEEPALIVE
Snowflake *get_snowflakes()
{
  return snowflakes;
}
