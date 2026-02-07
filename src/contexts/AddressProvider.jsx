import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";
import * as addressesApi from "../lib/api/addresses";

const AddressContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setAddressData":
      return { ...state, addressData: action.payload };
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
    case "clearForm":
      return {
        ...state,
        name: "",
        mobileNo: "",
        pinCode: "",
        city: "",
        address: "",
        showAddress: false,
      };
    case "showAddressBoxHandler":
      return { ...state, showAddress: action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  addressData: [],
  name: "",
  address: "",
  mobileNo: "",
  pinCode: "",
  city: "",
  showAddress: false,
};

const AddressProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const fetchAddresses = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch({ type: "setAddressData", payload: [] });
      return;
    }
    try {
      const addresses = await addressesApi.getAddresses();
      dispatch({ type: "setAddressData", payload: addresses });
    } catch (error) {
      console.error("[Address] Failed to fetch:", error.message);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

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

  const addAddressHandler = useCallback(async () => {
    if (
      !state.name ||
      !state.mobileNo ||
      !state.address ||
      !state.city ||
      !state.pinCode
    ) {
      toast.warn("Please fill all address fields");
      return;
    }
    try {
      await addressesApi.addAddress({
        name: state.name,
        mobileNo: state.mobileNo,
        street: state.address,
        city: state.city,
        pincode: state.pinCode,
      });
      dispatch({ type: "clearForm" });
      await fetchAddresses();
    } catch (error) {
      console.error("[Address] Failed to add:", error.message);
      toast.error("Failed to add address");
    }
  }, [
    state.name,
    state.mobileNo,
    state.address,
    state.city,
    state.pinCode,
    fetchAddresses,
  ]);

  const deleteHandler = useCallback(
    async (addressId) => {
      try {
        await addressesApi.deleteAddress(addressId);
        await fetchAddresses();
      } catch (error) {
        console.error("[Address] Failed to delete:", error.message);
        toast.error("Failed to delete address");
      }
    },
    [fetchAddresses]
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
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};

export default AddressProvider;

export const useAddressContext = () => useContext(AddressContext);
