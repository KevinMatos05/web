const express = require('express');
const cors = require('cors');
// Importa Op para operadores de Sequelize, necesario para la búsqueda
const { Sequelize, DataTypes, Op } = require('sequelize');
const app = express();
const port = 3000; // Puerto para el backend

// Middlewares
app.use(cors()); // Habilita CORS para que el frontend pueda comunicarse
app.use(express.json()); // Permite a Express leer JSON en el cuerpo de las peticiones

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './libros.sqlite' // Archivo de base de datos
});

// Definimos el modelo Libro
const Libro = sequelize.define('Libro', {
    IdLibro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AnioPublicacion: {
        type: DataTypes.INTEGER // Usamos INTEGER
        // allowNull por defecto es true, lo dejamos así
    }
}, {
    // Opciones adicionales del modelo
    // timestamps: false // Descomentar si no quieren createdAt y updatedAt
});

// Función para cargar 40 datos iniciales (Seeding)
async function seedDatabase() {
    try {
        const count = await Libro.count();
        if (count === 0) {
            console.log('Base de datos de libros vacía. Insertando 40 datos iniciales...');
            const librosIniciales = [
                { Titulo: 'Cien años de soledad', Autor: 'Gabriel García Márquez', AnioPublicacion: 1967 },
                { Titulo: 'Don Quijote de la Mancha', Autor: 'Miguel de Cervantes', AnioPublicacion: 1605 },
                { Titulo: '1984', Autor: 'George Orwell', AnioPublicacion: 1949 },
                { Titulo: 'Orgullo y prejuicio', Autor: 'Jane Austen', AnioPublicacion: 1813 },
                { Titulo: 'Matar a un ruiseñor', Autor: 'Harper Lee', AnioPublicacion: 1960 },
                { Titulo: 'El gran Gatsby', Autor: 'F. Scott Fitzgerald', AnioPublicacion: 1925 },
                { Titulo: 'Guerra y paz', Autor: 'León Tolstói', AnioPublicacion: 1869 },
                { Titulo: 'Crimen y castigo', Autor: 'Fiódor Dostoyevski', AnioPublicacion: 1866 },
                { Titulo: 'Un mundo feliz', Autor: 'Aldous Huxley', AnioPublicacion: 1932 },
                { Titulo: 'El principito', Autor: 'Antoine de Saint-Exupéry', AnioPublicacion: 1943 },
                { Titulo: 'El hobbit', Autor: 'J.R.R. Tolkien', AnioPublicacion: 1937 },
                { Titulo: 'Fahrenheit 451', Autor: 'Ray Bradbury', AnioPublicacion: 1953 },
                { Titulo: 'La Odisea', Autor: 'Homero', AnioPublicacion: -800 }, // Año aproximado
                { Titulo: 'Hamlet', Autor: 'William Shakespeare', AnioPublicacion: 1603 },
                { Titulo: 'En el camino', Autor: 'Jack Kerouac', AnioPublicacion: 1957 },
                { Titulo: 'Moby Dick', Autor: 'Herman Melville', AnioPublicacion: 1851 },
                { Titulo: 'Veinte mil leguas de viaje submarino', Autor: 'Julio Verne', AnioPublicacion: 1870 },
                { Titulo: 'La Divina Comedia', Autor: 'Dante Alighieri', AnioPublicacion: 1320 },
                { Titulo: 'Drácula', Autor: 'Bram Stoker', AnioPublicacion: 1897 },
                { Titulo: 'Frankenstein', Autor: 'Mary Shelley', AnioPublicacion: 1818 },
                { Titulo: 'Rebelión en la granja', Autor: 'George Orwell', AnioPublicacion: 1945 },
                { Titulo: 'Las aventuras de Tom Sawyer', Autor: 'Mark Twain', AnioPublicacion: 1876 },
                { Titulo: 'Alicia en el país de las maravillas', Autor: 'Lewis Carroll', AnioPublicacion: 1865 },
                { Titulo: 'El retrato de Dorian Gray', Autor: 'Oscar Wilde', AnioPublicacion: 1890 },
                { Titulo: 'Peter Pan', Autor: 'J.M. Barrie', AnioPublicacion: 1911 },
                { Titulo: 'Los miserables', Autor: 'Victor Hugo', AnioPublicacion: 1862 },
                { Titulo: 'La metamorfosis', Autor: 'Franz Kafka', AnioPublicacion: 1915 },
                { Titulo: 'Anna Karenina', Autor: 'León Tolstói', AnioPublicacion: 1877 },
                { Titulo: 'El guardián entre el centeno', Autor: 'J.D. Salinger', AnioPublicacion: 1951 },
                { Titulo: 'Un estudio en escarlata', Autor: 'Arthur Conan Doyle', AnioPublicacion: 1887 },
                { Titulo: 'La isla del tesoro', Autor: 'Robert Louis Stevenson', AnioPublicacion: 1883 },
                { Titulo: 'Orgullo y Prejuicio II', Autor: 'Jane Austen', AnioPublicacion: 1813 }, // Otro libro de Austen con titulo diferente
                { Titulo: 'El nombre de la rosa', Autor: 'Umberto Eco', AnioPublicacion: 1980 },
                { Titulo: 'Ensayo sobre la ceguera', Autor: 'José Saramago', AnioPublicacion: 1995 },
                { Titulo: 'Rayuela', Autor: 'Julio Cortázar', AnioPublicacion: 1963 },
                { Titulo: 'La ciudad y los perros', Autor: 'Mario Vargas Llosa', AnioPublicacion: 1963 },
                { Titulo: 'Cien años de soledad vol 2', Autor: 'Gabriel García Márquez', AnioPublicacion: 1967 }, // Similar a uno existente pero diferente título
                { Titulo: 'El amor en los tiempos del cólera', Autor: 'Gabriel García Márquez', AnioPublicacion: 1985 },
                { Titulo: 'Crónica de una muerte anunciada', Autor: 'Gabriel García Márquez', AnioPublicacion: 1981 },
                { Titulo: 'Noticia de un secuestro', Autor: 'Gabriel García Márquez', AnioPublicacion: 1996 } // Total 40
            ];
            await Libro.bulkCreate(librosIniciales);
            console.log('40 datos iniciales de libros insertados correctamente.');
        } else {
            console.log('La base de datos ya contiene datos de libros. Saltando inserción inicial.');
        }
    } catch (error) {
        console.error('Error al insertar datos iniciales:', error);
    }
}

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Backend de Gestión de Libros Funcionando!');
});

// Rutas API para libros

// GET /api/libros - Obtener todos los libros o filtrar por 'search' (solo en Titulo)
app.get('/api/libros', async (req, res) => {
    const searchTerm = req.query.search; // Obtiene el parámetro search de la query string

    try {
        let libros;
        if (searchTerm) {
            // Implementación de la lógica de búsqueda usando Sequelize Op.like para buscar SOLO en Titulo
            // Sequelize Op.iLike es para búsqueda case-insensitive, si dialect lo soporta (PostgreSQL),
            // si no, Op.like con toLowerCase() puede funcionar dependiendo de la BD y cómo se almacenen los datos.
            // Para SQLite simple, Op.like suele ser case-insensitive por defecto en WHERE para strings.
            libros = await Libro.findAll({
                where: {
                    // Buscar solo donde el Título contenga el término
                    Titulo: { [Op.like]: `%${searchTerm}%` }
                }
            });
        } else {
            // Si no hay término de búsqueda, obtener todos los libros
            libros = await Libro.findAll();
        }
        res.json(libros);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener libros.' });
    }
});

// GET /api/libros/:id - Obtener un libro por ID
app.get('/api/libros/:id', async (req, res) => {
    const libroId = req.params.id;
    try {
        const libro = await Libro.findByPk(libroId);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: `No se encontró libro con ID ${libroId}.` });
        }
    } catch (error) {
        console.error(`Error al obtener libro con ID ${libroId}:`, error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el libro.' });
    }
});


// POST /api/libros - Crear un nuevo libro
app.post('/api/libros', async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body); // Sequelize crea e inserta
        res.status(201).json(nuevoLibro); // 201 Created
    } catch (error) {
        console.error('Error al crear libro:', error);
        // Basic validation error check (SequelizeUniqueConstraintError, ValidationError, etc.)
        if (error.name === 'SequelizeValidationError') {
             res.status(400).json({ error: error.errors.map(e => e.message) }); // Envía mensajes de validación
        } else {
             res.status(500).json({ error: 'Error interno del servidor al crear el libro.' });
        }
    }
});

// PUT /api/libros/:id - Actualizar un libro por ID
app.put('/api/libros/:id', async (req, res) => {
    const libroId = req.params.id;
    try {
        const libro = await Libro.findByPk(libroId);
        if (!libro) {
            res.status(404).json({ error: `No se encontró libro con ID ${libroId}.` });
            return;
        }

        // Actualiza el libro con los datos recibidos
        await libro.update(req.body);

        res.status(200).json(libro); // Retorna el libro actualizado

    } catch (error) {
        console.error(`Error al actualizar libro con ID ${libroId}:`, error);
         if (error.name === 'SequelizeValidationError') {
             res.status(400).json({ error: error.errors.map(e => e.message) }); // Envía mensajes de validación
        } else {
            res.status(500).json({ error: 'Error interno del servidor al actualizar el libro.' });
        }
    }
});


// DELETE /api/libros/:id - Eliminar un libro por ID
app.delete('/api/libros/:id', async (req, res) => {
    const libroId = req.params.id;

    try {
        // Implementación de la lógica de eliminación usando Sequelize destroy
        const deletedRowCount = await Libro.destroy({
            where: {
                IdLibro: libroId // Elimina el libro con el ID especificado
            }
        });

        if (deletedRowCount > 0) {
            // Si se eliminó al menos una fila
            res.status(200).json({ message: `Libro con ID ${libroId} eliminado correctamente.` });
        } else {
            // Si no se encontró el libro con ese ID
            res.status(404).json({ error: `No se encontró libro con ID ${libroId}.` });
        }
    } catch (error) {
        console.error(`Error al eliminar libro con ID ${libroId}:`, error);
        res.status(500).json({ error: 'Error interno del servidor al eliminar el libro.' });
    }
});

// Sincronizar el modelo con la base de datos y luego iniciar el servidor
// Usar { force: true } en desarrollo para recrear tablas cada vez - ¡Cuidado en producción!
sequelize.sync({ force: true })
    .then(() => {
        console.log('Base de datos sincronizada (tablas recreadas).');
        return seedDatabase(); // Cargar datos después de sincronizar
    })
    .then(() => {
        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor de Backend para Gestión de Libros escuchando en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos o sembrar datos:', err);
    });