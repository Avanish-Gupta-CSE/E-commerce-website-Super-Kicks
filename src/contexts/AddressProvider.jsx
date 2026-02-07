import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import { toast } from "react-toastify";

const AddressContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setNameHandler":
      return { ...state, name: action.payload };
    case "setMobileNoHandler":
      return { ...state, mobileNo: action.payload };
    case "setAddressHandler":
      return { ...state, address: action.payload };
    case "setPinCodeHandler":
      return { ...state, pinCode: action.payload };
    case "setCityHandler":
      return { ...state, city: action.payload };
    case "addAddress":
      return {
        ...state,
        addressData: [
          ...state.addressData,
          {
            name: state.name,
            mobileNo: state.mobileNo,
            pinCode: state.pinCode,
            city: state.city,
            address: state.address,
          },
        ],
        name: "",
        mobileNo: "",
        pinCode: "",
        city: "",
        address: "",
        showAddress: false,
      };
    case "updateAddressData":
      return { ...state, addressData: action.payload };
    case "showAddressBoxHandler":
      return { ...state, showAddress: action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  addressData: [
    {
      name: "John Snow",
      mobileNo: 9999999999,
      pinCode: 100001,
      city: "London",
      address: "23 School Lane",
    },
  ],
  name: "",
  address: "",
  mobileNo: "",
  pinCode: "",
  city: "",
  showAddress: false,
};

const AddressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const setNameHandler = useCallback((e) => {
    dispatch({ type: "setNameHandler", payload: e.target.value });
  }, []);

  const setMobileNoHandler = useCallback((e) => {
    dispatch({ type: "setMobileNoHandler", payload: e.target.value });
  }, []);

  const setPinCodeHandler = useCallback((e) => {
    dispatch({ type: "setPinCodeHandler", payload: e.target.value });
  }, []);

  const setCityHandler = useCallback((e) => {
    dispatch({ type: "setCityHandler", payload: e.target.value });
  }, []);

  const setAddressHandler = useCallback((e) => {
    dispatch({ type: "setAddressHandler", payload: e.target.value });
  }, []);

  const addAddressHandler = useCallback(() => {
    if (!state.name || !state.mobileNo || !state.address || !state.city || !state.pinCode) {
      toast.warn("Please fill all address fields");
      return;
    }
    dispatch({ type: "addAddress" });
  }, [state.name, state.mobileNo, state.address, state.city, state.pinCode]);

  const deleteHandler = useCallback(
    (index) => {
      const updatedData = state.addressData.filter((_, i) => i !== index);
      dispatch({ type: "updateAddressData", payload: updatedData });
    },
    [state.addressData]
  );

  const showAddressBoxHandler = useCallback((bool) => {
    dispatch({ type: "showAddressBoxHandler", payload: bool });
  }, []);

  const value = useMemo(
    () => ({
      addressData: state.addressData,
      setNameHandler,
      setAddressHandler,
      setCityHandler,
      setPinCodeHandler,
      setMobileNoHandler,
      addAddressHandler,
      name: state.name,
      address: state.address,
      mobileNo: state.mobileNo,
      pinCode: state.pinCode,
      city: state.city,
      deleteHandler,
      showAddressBoxHandler,
      showAddress: state.showAddress,
    }),
    [
      state.addressData,
      state.name,
      state.address,
      state.mobileNo,
      state.pinCode,
      state.city,
      state.showAddress,
      setNameHandler,
      setAddressHandler,
      setCityHandler,
      setPinCodeHandler,
      setMobileNoHandler,
      addAddressHandler,
      deleteHandler,
      showAddressBoxHandler,
    ]
  );

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;

export const useAddressContext = () => useContext(AddressContext);
