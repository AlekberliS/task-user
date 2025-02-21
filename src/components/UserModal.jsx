import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";


export default function UM({ isOpen, closeModal, selectedUser }) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={closeModal}
           
            classNames={{
                backdrop: "bg-black/50 backdrop-blur-sm",
                base: "rounded-xl shadow-lg",
                closeButton: "absolute top-3 right-3"
            }}
        >
            <ModalContent className="bg-white min-w-64 max-w-80 sm:max-w-lg relative m-auto  rounded-2xl shadow-xl p-6 border border-gray-200">
            
                <ModalHeader className="text-2xl font-bold text-gray-900 border-b pb-2">
                    İşçi Məlumatı
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4 text-gray-700 pt-4">
                    {selectedUser ? (
                        <>
                            <p><strong>İşçi Nömrəsi:</strong> <span className="text-blue-500 cursor-pointer hover:underline">{selectedUser.employeeNumber}</span></p>
                            <p><strong>Adı Soyadı:</strong> {selectedUser.name}</p>
                            <p><strong>Əmrin əsas səbəbi:</strong> {selectedUser.reason}</p>
                            <p><strong>Qeyd:</strong> {selectedUser.note || "-"}</p>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 col-span-2">Seçilmiş işçi yoxdur.</p>
                    )}
                </ModalBody>
                <ModalFooter className="justify-end border-t pt-3">
                    <Button 
                        color="primary" 
                        variant="solid" 
                        onPress={closeModal} 
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md"
                    >
                        Bağla
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
