use std::fs::File;
use std::io::{self, prelude::*, BufReader};

fn main() -> io::Result<()> {
    part_one()?;
    part_two()
}

fn part_one() -> io::Result<()> {
    let file = File::open("sonarSweep.txt")?;
    let mut reader = BufReader::new(file);
    let mut last_sweep_string = String::new();
    reader.read_line(&mut last_sweep_string)?;
    let mut last_sweep = last_sweep_string.trim().parse::<i32>().unwrap();

    let mut increments = 0;
    for line in reader.lines() {
        let sweep = line.unwrap().parse::<i32>().unwrap();
        if sweep > last_sweep {
            increments += 1;
        }
        last_sweep = sweep;
    }
    println!("Increments Part 1: {}", increments);
    Ok(())

}

fn part_two() -> io::Result<()> {
    let file = File::open("sonarSweep.txt")?;
    let mut reader = BufReader::new(file);
    let mut last_sweep_string = String::new();
    let mut window_values = vec![];
    for _i in 0..3 {
        last_sweep_string.clear();
        reader.read_line(&mut last_sweep_string)?;
        window_values.push(last_sweep_string.trim().parse::<i32>().unwrap());
    }
    let mut increments = 0;
    for line in reader.lines() {
        let sweep = line.unwrap().parse::<i32>().unwrap();
        if window_values[1] + window_values[2] + sweep > window_values.iter().sum() {
            increments += 1;
        }
        window_values.rotate_left(1);
        let n = window_values.len() - 1;
        let last = &mut window_values[n];
        *last = sweep;
    }
    println!("Increments Part 2: {}", increments);
    Ok(())
}
