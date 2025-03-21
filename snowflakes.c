#include <stdlib.h>
#include <math.h>
#include <emscripten.h>

#define NUM_SNOWFLAKES 100

typedef struct
{
  float x, y;
  float speed;
} Snowflake;

Snowflake snowflakes[NUM_SNOWFLAKES];

EMSCRIPTEN_KEEPALIVE
void init_snowflakes(int width, int height)
{
  for (int i = 0; i < NUM_SNOWFLAKES; i++)
  {
    snowflakes[i].x = rand() % width;
    snowflakes[i].y = rand() % height;
    snowflakes[i].speed = (rand() % 3 + 1) * 0.5;
  }
}

EMSCRIPTEN_KEEPALIVE
void update_snowflakes(int width, int height)
{
  for (int i = 0; i < NUM_SNOWFLAKES; i++)
  {
    snowflakes[i].y += snowflakes[i].speed;
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