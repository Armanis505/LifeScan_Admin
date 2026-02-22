const Students = async () => {
    try {
        const response = await fetch('http://localhost:4000/students');

        if (!response.ok) {
            throw new Error("No se pudo establecer conexión");
        }

        const admins = await response.json();
        
        return admins;
    }
    catch (error) {
        throw new Error(error.message || "Error al cargar la Tabla");
    }
};

export default Students;