const saveStundent = async (data) => {
    try{
        const response = await fetch('http://localhost:4000/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return "Estudiante registrado exitosamente";
        }
    }
    catch (error) {
        return "Error al registrar el estudiante: " + error.message;
    }
}

export default saveStundent;