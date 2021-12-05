use std::fs::File;
use std::io::{self, prelude::*, BufReader};

fn main() -> io::Result<()> {
    part_one()?;
    part_two()
}

fn part_one() -> io::Result<()> {
    let file = File::open("sonarSweep.txt")?;
    let mut reader = BufReader::new(file);
    let mut last_sweep = String::new();
    reader.read_line(&mut last_sweep)?;
    let mut last_sweep = last_sweep.trim().parse::<i32>().unwrap();

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
    let mut last_sweep = String::new();
    let mut window = vec![];
    for _i in 0..3 {
        last_sweep.clear();
        reader.read_line(&mut last_sweep)?;
        window.push(last_sweep.trim().parse::<i32>().unwrap());
    }
    let mut increments = 0;
    for line in reader.lines() {
        let sweep = line.unwrap().parse::<i32>().unwrap();
        if window[1] + window[2] + sweep > window.iter().sum() {
            increments += 1;
        }
        window.rotate_left(1);
        let last = window.len() - 1;
        window[last] = sweep;
    }
    println!("Increments Part 2: {}", increments);
    Ok(())
}
