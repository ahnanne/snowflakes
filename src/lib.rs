use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug)]
struct Particle {
    x: f32,
    y: f32,
    opacity: f32,
    speed_x: f32,
    speed_y: f32,
    radius: f32,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct SnowCanvas {
    width: u32,
    height: u32,
    count: u32,
    angle: f32,
    particles: Vec<Particle>,
}

#[wasm_bindgen]
impl Particle {
    fn update(&mut self, angle: f32) {
        self.x += (angle + self.speed_x).cos();
        self.y += angle.sin();
    }
}

#[wasm_bindgen]
impl SnowCanvas {
    pub fn new(width: u32, height: u32, count: u32) -> Self {
        let mut particles: Vec<Particle> = vec![];
        for _ in 0..count {
            let particle = Particle {
                x: width as f32 * SnowCanvas::get_random(),
                y: height as f32 * SnowCanvas::get_random(),
                opacity: SnowCanvas::get_random(),
                speed_x: SnowCanvas::get_random(),
                speed_y: SnowCanvas::get_random(),
                radius: SnowCanvas::get_random(),
            };
            particles.push(particle);
        }
        SnowCanvas {
            width,
            height,
            count,
            angle: 0.01,
            particles,
        }
    }

    fn get_random() -> f32 {
        let mut rng = rand::thread_rng();
        return rng.gen_range(0.0..1.0);
    }

    pub fn update(&mut self) {
        self.angle += 0.01;
        for index in 0..self.count {
            let p = &mut self.particles[index as usize];
            p.update(self.angle);

            if p.x > (self.width + 5) as f32 || p.x < -5.0 || p.y > self.height as f32 {
                if index % 3 > 0 {
                    self.particles[index as usize] = Particle {
                        x: SnowCanvas::get_random() * self.width as f32,
                        y: -10.0,
                        opacity: p.opacity,
                        speed_x: p.speed_x,
                        speed_y: p.speed_y,
                        radius: p.radius,
                    };
                } else {
                    self.particles[index as usize] = Particle {
                        x: 5.0 + self.width as f32,
                        y: SnowCanvas::get_random() * self.height as f32,
                        opacity: p.opacity,
                        speed_x: p.speed_x,
                        speed_y: p.speed_y,
                        radius: p.radius,
                    }
                }
            }
        }
    }

    pub fn get_particle_x(&self, index: usize) -> f32 {
        self.particles[index].x
    }
    pub fn get_particle_y(&self, index: usize) -> f32 {
        self.particles[index].y
    }
    pub fn get_particle_opacity(&self, index: usize) -> f32 {
        self.particles[index].opacity
    }
    pub fn get_particle_speed_x(&self, index: usize) -> f32 {
        self.particles[index].speed_x
    }
    pub fn get_particle_speed_y(&self, index: usize) -> f32 {
        self.particles[index].speed_y
    }
    pub fn get_particle_radius(&self, index: usize) -> f32 {
        self.particles[index].radius
    }
}
