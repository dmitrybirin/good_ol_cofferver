CREATE TABLE IF NOT EXISTS wheels (
    id INT AUTO_INCREMENT,
    sweet INT NOT NULL,
    sour_tart INT NOT NULL,
    floral INT NOT NULL,
    spicy INT NOT NULL,
    salty INT NOT NULL,
    berry_fruit INT NOT NULL,
    citrus_fruit INT NOT NULL,
    stone_fruit INT NOT NULL,
    chocolate INT NOT NULL,
    caramel INT NOT NULL,
    smoky INT NOT NULL,
    bitter INT NOT NULL,
    savory INT NOT NULL,
    body INT NOT NULL,
    clean INT NOT NULL,
    linger_finish INT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS wheels (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATE,
    description TEXT,
    wheel_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY(wheel_id) REFERENCES wheels(id)
)  ENGINE=INNODB;